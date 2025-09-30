// import prisma from "@/lib/prisma";

async function getDashboardStats() {
  try {
    const [
      receitaMensal,
      maquinasAgendadas,
      maquinasEmManutencao,
      totalMaquinas,
      proximasDevolucoes,
    ] = await Promise.all([
      // Receita do mês: soma o totalPrice de aluguéis concluídos no mês atual.
      prisma.aluguel.aggregate({
        _sum: { totalPrice: true },
        where: {
          status: "CONCLUIDO",
          endDate: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),

      // Máquinas agendadas: conta aluguéis com status AGENDADO.
      prisma.aluguel.count({ where: { status: "AGENDADO" } }),

      // Máquinas em manutenção: conta máquinas com status EM_MANUTENCAO.
      prisma.maquina.count({ where: { status: "EM_MANUTENCAO" } }),

      // Total de máquinas na frota.
      prisma.maquina.count(),

      // Próximas devoluções: busca aluguéis ativos que terminam nos próximos 7 dias.
      prisma.aluguel.findMany({
        where: {
          status: 'ATIVO',
          endDate: {
            gte: new Date(), // A partir de agora
            lte: new Date(new Date().setDate(new Date().getDate() + 7)), // Até 7 dias no futuro
          }
        },
        include: { // Incluímos os dados da máquina para saber qual é
          maquina: {
            select: { name: true }
          }
        },
        orderBy: {
          endDate: 'asc' // Ordena pela data de devolução mais próxima
        }
      })
    ]);

    // O campo "contas a pagar" não tem um modelo no banco ainda.
    // Por enquanto, vamos retornar um valor fixo. Depois criamos a lógica pra ele.
    const contasAPagar = 0; // Placeholder

    return {
      receitaMensal: receitaMensal._sum.totalPrice || 0,
      contasAPagar,
      totalMaquinas,
      maquinasAgendadas,
      maquinasEmManutencao,
      proximasDevolucoes,
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas do dashboard:", error);
    // Em caso de erro, retornamos valores zerados para não quebrar a página.
    return {
      receitaMensal: 0,
      contasAPagar: 0,
      totalMaquinas: 0,
      maquinasAgendadas: 0,
      maquinasEmManutencao: 0,
      proximasDevolucoes: [],
    };
  }
}

// 2. O componente principal foi renomeado e simplificado.
//    Toda a poluição visual do HTML foi removida.
export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    // O container principal foi mantido, mas agora está dentro do nosso layout com sidebar.
    <div className="flex flex-col gap-8">
      
      {/* TODO: PASSO 1 - Implementar o Header aqui. */}
      {/* Ele terá a logo, o título "Painel de Controle" e o ícone do menu drawer. */}
      <div>
        <h1 className="text-3xl font-bold">Painel de Controle</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Coluna Principal (70% da largura) */}
        <div className="w-full lg:w-8/12 flex flex-col gap-8">
          
          {/* TODO: PASSO 2 - Seção dos Cards de Indicadores (KPIs) */}
          {/* Aqui você vai criar um componente <KpiCard /> e usá-lo 5 vezes, */}
          {/* passando os dados de 'stats' como props. */}
          <section>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
               {/* Exemplo de como você vai usar o componente depois de criá-lo */}
               {/* <KpiCard title="Receita Mensal" value={stats.receitaMensal} /> */}
               <div className="bg-white p-4 rounded-lg shadow-sm border h-24 animate-pulse">Card KPI</div>
               <div className="bg-white p-4 rounded-lg shadow-sm border h-24 animate-pulse">Card KPI</div>
               <div className="bg-white p-4 rounded-lg shadow-sm border h-24 animate-pulse">Card KPI</div>
               <div className="bg-white p-4 rounded-lg shadow-sm border h-24 animate-pulse">Card KPI</div>
               <div className="bg-white p-4 rounded-lg shadow-sm border h-24 animate-pulse">Card KPI</div>
            </div>
          </section>

          {/* TODO: PASSO 3 - Seção dos Módulos em Carrossel */}
          {/* Aqui você vai implementar o componente de carrossel da biblioteca shadcn/ui */}
          {/* e criar um componente <ModuleCard /> para cada item do carrossel. */}
          <section>
             <h2 className="text-xl font-semibold mb-4">Módulos do Sistema</h2>
             <div className="bg-white p-4 rounded-lg shadow-sm border h-64 animate-pulse">
                Carrossel dos Módulos aqui...
             </div>
          </section>

        </div>

        {/* Coluna Lateral (30% da largura) */}
        <div className="w-full lg:w-4/12 flex flex-col gap-8">

          {/* TODO: PASSO 4 - Seção de Acesso Rápido */}
          {/* Aqui você vai criar o botão "+ Novo Aluguel" e a lista de "Próximas Devoluções" */}
          {/* usando os dados de 'stats.proximasDevolucoes'. */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Acesso Rápido</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm border h-80 animate-pulse">
                Botão e Lista de Devoluções aqui...
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}