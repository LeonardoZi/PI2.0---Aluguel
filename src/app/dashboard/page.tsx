//import prisma from '@/lib/prisma';
import KpiCard from '@/components/KpiCard';
import { Briefcase, CheckCircle, Clock, Cog, DollarSign, Users, FileText, Truck } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ModuleCard from '@/components/ModuleCard';

async function getDashboardStats() {
    try {
        const [receitaMensal, maquinasAgendadas, maquinasEmManutencao, totalMaquinas, proximasDevolucoes] = await Promise.all([
            prisma.aluguel.aggregate({ _sum: { totalPrice: true }, where: { status: "CONCLUIDO", endDate: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } }),
            prisma.aluguel.count({ where: { status: "AGENDADO" } }),
            prisma.maquina.count({ where: { status: "EM_MANUTENCAO" } }),
            prisma.maquina.count(),
            prisma.aluguel.findMany({ where: { status: 'ATIVO', endDate: { gte: new Date(), lte: new Date(new Date().setDate(new Date().getDate() + 7)) } }, include: { maquina: { select: { name: true } } }, orderBy: { endDate: 'asc' } })
        ]);
        const contasAPagar = 0;
        return { receitaMensal: receitaMensal._sum.totalPrice || 0, contasAPagar, totalMaquinas, maquinasAgendadas, maquinasEmManutencao, proximasDevolucoes };
    } catch (error) {
        console.error("Erro ao buscar estatísticas do dashboard:", error);
        return { receitaMensal: 0, contasAPagar: 0, totalMaquinas: 0, maquinasAgendadas: 0, maquinasEmManutencao: 0, proximasDevolucoes: [] };
    }
}

const modulesData = [
  { href: '/dashboard/maquinas', icon: <Cog />, title: 'Máquinas', description: 'Gerencie sua frota de máquinas e equipamentos.', iconBgColor: 'bg-blue-50', iconTextColor: 'text-blue-500' },
  { href: '/dashboard/alugueis', icon: <Truck />, title: 'Aluguel', description: 'Registre e acompanhe todos os aluguéis.', iconBgColor: 'bg-green-50', iconTextColor: 'text-green-500' },
  { href: '/dashboard/clientes', icon: <Users />, title: 'Clientes', description: 'Cadastre e gerencie sua base de clientes.', iconBgColor: 'bg-yellow-50', iconTextColor: 'text-yellow-500' },
  { href: '/dashboard/contas', icon: <DollarSign />, title: 'Contas a Pagar', description: 'Controle suas despesas e contas a pagar.', iconBgColor: 'bg-red-50', iconTextColor: 'text-red-500' },
  { href: '/dashboard/manutencao', icon: <CheckCircle />, title: 'Manutenção', description: 'Acompanhe a manutenção preventiva e corretiva.', iconBgColor: 'bg-purple-50', iconTextColor: 'text-purple-500' },
  { href: '/dashboard/relatorios', icon: <FileText />, title: 'Relatórios', description: 'Visualize análises e estatísticas do seu negócio.', iconBgColor: 'bg-indigo-50', iconTextColor: 'text-indigo-500' },
];


export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="flex flex-col gap-8">
      <div className='-mt-4'>
        <h1 className="text-3xl font-bold">Painel de Controle</h1>
      </div>

      {/* Cards de info rápida */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <KpiCard
            title="Receita Mensal"
            value={stats.receitaMensal}
            icon={<DollarSign size={24} />}
            formatAsCurrency={true}
          />
          <KpiCard
            title="Despesas Manutenção"
            value={stats.contasAPagar}
            icon={<Briefcase size={24} />}
            formatAsCurrency={true}
          />
          <KpiCard
            title="Total de Máquinas"
            value={stats.totalMaquinas}
            icon={<Cog size={24} />}
          />
          <KpiCard
            title="Agendados"
            value={stats.maquinasAgendadas}
            icon={<Clock size={24} />}
          />
          <KpiCard
            title="Em Manutenção"
            value={stats.maquinasEmManutencao}
            icon={<CheckCircle size={24} />}
          />
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Coluna da Esquerda (Módulos do Sistema) */}
        <div className="w-full lg:w-8/12">
          <section>
            <h2 className="text-xl font-semibold mb-4">Módulos do Sistema</h2>
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent>
                {modulesData.map((module, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-2">
                    <ModuleCard {...module} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-12" />
              <CarouselNext className="mr-12" />
            </Carousel>
          </section>
        </div>

        {/* Coluna da Direita (Acesso Rápido) */}
        <div className="w-full lg:w-4/12">
          <section>
            <h2 className="text-xl font-semibold mb-4">Acesso Rápido</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm border h-80">
              Botão e Lista de Devoluções aqui...
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}