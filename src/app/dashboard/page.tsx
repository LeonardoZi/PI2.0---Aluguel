import prisma from '@/lib/prisma';
import KpiCard from '@/components/KpiCard';
import { Briefcase, CheckCircle, Clock, Cog, DollarSign, Users, FileText, Truck, Archive } from 'lucide-react';
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
    const [
      receitaMensal,
      totalEmEstoque,
      alugueisAtivos,
    ] = await Promise.all([
      // A lógica de receita mensal provavelmente continua válida.
      prisma.aluguel.aggregate({ 
        _sum: { totalPrice: true }, 
        where: { 
          status: "CONCLUIDO", 
          endDate: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } 
        } 
      }),

      prisma.produto.aggregate({
        _sum: { estoque: true }
      }),

      prisma.aluguel.count({
        where: { status: 'ATIVO' }
      }),
    ]);

    return { 
      receitaMensal: receitaMensal._sum.totalPrice || 0,
      totalEmEstoque: totalEmEstoque._sum.estoque || 0,
      alugueisAtivos: alugueisAtivos || 0,
    };

  } catch (error) {
    console.error("Erro ao buscar estatísticas do dashboard:", error);
    return { 
      receitaMensal: 0, 
      totalEmEstoque: 0, 
      alugueisAtivos: 0,
    };
  }
}

const modulesData = [
  { href: '/dashboard/produtos', icon: <Cog />, title: 'Produtos', description: 'Gerencie seus produtos.', iconBgColor: 'bg-blue-50', iconTextColor: 'text-blue-500' },
  { href: '/dashboard/aluguel', icon: <Truck />, title: 'Aluguel', description: 'Registre e acompanhe todos os aluguéis.', iconBgColor: 'bg-green-50', iconTextColor: 'text-green-500' },
  { href: '/dashboard/clientes', icon: <Users />, title: 'Clientes', description: 'Cadastre e gerencie sua base de clientes.', iconBgColor: 'bg-yellow-50', iconTextColor: 'text-yellow-500' },
  { href: '/dashboard/?', icon: <DollarSign />, title: '??', description: 'Controle suas despesas e contas a pagar.', iconBgColor: 'bg-red-50', iconTextColor: 'text-red-500' },
  { href: '/dashboard/??', icon: <CheckCircle />, title: '??', description: 'Acompanhe a manutenção preventiva e corretiva.', iconBgColor: 'bg-purple-50', iconTextColor: 'text-purple-500' },
  { href: '/dashboard/relatorios', icon: <FileText />, title: 'Relatórios', description: 'Visualize análises e estatísticas do seu negócio.', iconBgColor: 'bg-indigo-50', iconTextColor: 'text-indigo-500' },
];


export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="flex flex-col gap-8">
      <div className='-mt-4'>
        <h1 className="text-3xl font-bold">Painel de Controle</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-8/12 flex flex-col gap-8">
          
          <section>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <KpiCard
                title="Receita Mensal"
                value={stats.receitaMensal}
                icon={<DollarSign size={24} />}
                formatAsCurrency={true}
              />
              <KpiCard
                title="Total em Estoque (un)"
                value={stats.totalEmEstoque}
                icon={<Archive size={24} />}
              />
              <KpiCard
                title="Aluguéis Ativos"
                value={stats.alugueisAtivos}
                icon={<Clock size={24} />}
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Módulos do Sistema</h2>
            <Carousel opts={{ align: "start", slidesToScroll: 3 }} className="w-full">
              <CarouselContent>
                {modulesData.map((module, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-2">
                    <ModuleCard {...module} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-9" />
              <CarouselNext className="-right-7" />
            </Carousel>
          </section>
        </div>

        <div className="w-full lg:w-4/12">
          <section className="h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Acesso Rápido</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm border flex-1">
              Botão e Lista de Devoluções aqui...
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}