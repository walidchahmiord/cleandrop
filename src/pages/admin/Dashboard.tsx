import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Package, Users, Star, DollarSign, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { products } from '@/data/products';
import { getCustomers } from '@/data/users';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/auth" replace />;
  }

  const stats = [
    { label: 'Total Revenue', value: '$124,500', icon: DollarSign, change: '+12%' },
    { label: 'Products', value: products.length, icon: Package, change: '+2' },
    { label: 'Customers', value: getCustomers().length, icon: Users, change: '+15%' },
    { label: 'Avg Rating', value: '4.8', icon: Star, change: '+0.1' },
  ];

  return (
    <main className="min-h-screen bg-muted pt-24">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-medium mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground mb-8">Welcome back, {user?.name}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="flex justify-between items-start">
                  <stat.icon className="text-primary" size={24} />
                  <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">{stat.change}</span>
                </div>
                <p className="stat-value mt-4">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="dashboard-card">
              <h2 className="font-display text-xl mb-4 flex items-center gap-2"><TrendingUp size={20} /> Sales Overview</h2>
              <div className="h-64 bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                <BarChart3 size={48} />
                <span className="ml-2">Chart Placeholder</span>
              </div>
            </div>
            <div className="dashboard-card">
              <h2 className="font-display text-xl mb-4">Top Products</h2>
              <div className="space-y-4">
                {products.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center gap-4">
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1"><p className="font-medium">{p.name}</p><p className="text-sm text-muted-foreground">{p.reviewCount} sales</p></div>
                    <span className="font-bold">${p.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default AdminDashboard;
