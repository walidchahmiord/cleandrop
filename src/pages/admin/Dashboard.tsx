import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, Package, Users, Star, DollarSign, TrendingUp, 
  Plus, Edit2, Trash2, Eye, Search, Filter, MessageSquare,
  Settings, ShoppingBag, AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { products as initialProducts, Product } from '@/data/products';
import { getCustomers, mockUsers, User } from '@/data/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'soap-sheets',
    features: '',
  });

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/auth" replace />;
  }

  const stats = [
    { label: 'Total Revenue', value: '$124,500', icon: DollarSign, change: '+12%', color: 'bg-emerald-500' },
    { label: 'Products', value: products.length, icon: Package, change: '+2', color: 'bg-blue-500' },
    { label: 'Customers', value: getCustomers().length, icon: Users, change: '+15%', color: 'bg-purple-500' },
    { label: 'Avg Rating', value: '4.8', icon: Star, change: '+0.1', color: 'bg-amber-500' },
  ];

  // Chart data
  const salesData = [
    { month: 'Jan', sales: 4000, revenue: 2400 },
    { month: 'Feb', sales: 3000, revenue: 1398 },
    { month: 'Mar', sales: 5000, revenue: 9800 },
    { month: 'Apr', sales: 4780, revenue: 3908 },
    { month: 'May', sales: 5890, revenue: 4800 },
    { month: 'Jun', sales: 6390, revenue: 3800 },
    { month: 'Jul', sales: 7490, revenue: 4300 },
  ];

  const categoryData = [
    { name: 'Soap Sheets', value: 45 },
    { name: 'Bundles', value: 30 },
    { name: 'Accessories', value: 15 },
    { name: 'Gift Sets', value: 10 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

  const revenueData = [
    { day: 'Mon', amount: 1200 },
    { day: 'Tue', amount: 1900 },
    { day: 'Wed', amount: 1500 },
    { day: 'Thu', amount: 2100 },
    { day: 'Fri', amount: 2400 },
    { day: 'Sat', amount: 1800 },
    { day: 'Sun', amount: 2200 },
  ];

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error('Please fill in required fields');
      return;
    }
    const product: Product = {
      id: `product-${Date.now()}`,
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      image: '/placeholder.svg',
      category: newProduct.category as Product['category'],
      type: 'unscented',
      features: newProduct.features.split(',').map(f => f.trim()).filter(Boolean),
      sheets: 50,
      inStock: true,
      rating: 5,
      reviewCount: 0,
      reviews: [],
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', description: '', price: '', category: 'soap-sheets', features: '' });
    setIsAddProductOpen(false);
    toast.success('Product added successfully!');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted');
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
    toast.success('Product updated');
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
    toast.success('User updated');
  };

  const handleDeleteReview = (productId: string, reviewIndex: number) => {
    setProducts(products.map(p => {
      if (p.id === productId) {
        return { ...p, reviews: p.reviews.filter((_, i) => i !== reviewIndex) };
      }
      return p;
    }));
    toast.success('Review deleted');
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allReviews = products.flatMap(p => 
    p.reviews.map((r, i) => ({ ...r, productId: p.id, productName: p.name, reviewIndex: i }))
  );

  return (
    <main className="min-h-screen bg-muted/30 pt-24">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="font-display text-4xl font-medium">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
            <div className="flex gap-2">
              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus size={18} /> Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label>Product Name *</Label>
                      <Input 
                        value={newProduct.name} 
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        placeholder="e.g., Fresh Mint Soap Sheets"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea 
                        value={newProduct.description} 
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        placeholder="Product description..."
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Price *</Label>
                        <Input 
                          type="number" 
                          value={newProduct.price} 
                          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                          placeholder="9.99"
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select value={newProduct.category} onValueChange={(v) => setNewProduct({...newProduct, category: v})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="soap-sheets">Soap Sheets</SelectItem>
                            <SelectItem value="bundles">Bundles</SelectItem>
                            <SelectItem value="accessories">Accessories</SelectItem>
                            <SelectItem value="gift-sets">Gift Sets</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Features (comma-separated)</Label>
                      <Input 
                        value={newProduct.features} 
                        onChange={(e) => setNewProduct({...newProduct, features: e.target.value})}
                        placeholder="Eco-friendly, Portable, 50 sheets"
                      />
                    </div>
                    <Button onClick={handleAddProduct} className="w-full">Add Product</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className={`${stat.color} p-3 rounded-xl`}>
                        <stat.icon className="text-white" size={24} />
                      </div>
                      <span className="text-sm text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full font-medium">
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-3xl font-bold mt-4">{stat.value}</p>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp size={20} /> Sales & Revenue Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="revenue" fill="hsl(var(--primary)/0.5)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  {categoryData.map((cat, i) => (
                    <div key={cat.name} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-muted-foreground">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Revenue */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign size={20} /> Weekly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Tabs for Management */}
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="grid w-full sm:w-auto grid-cols-4 gap-2">
              <TabsTrigger value="products" className="gap-2">
                <Package size={16} /> Products
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <Users size={16} /> Users
              </TabsTrigger>
              <TabsTrigger value="reviews" className="gap-2">
                <MessageSquare size={16} /> Reviews
              </TabsTrigger>
              <TabsTrigger value="strategies" className="gap-2">
                <Settings size={16} /> Strategies
              </TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle>Product Management</CardTitle>
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <Input 
                        placeholder="Search products..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Price</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Rating</th>
                          <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-muted-foreground line-clamp-1">{product.description.slice(0, 40)}...</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm capitalize">
                                {product.category.replace('-', ' ')}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-medium">${product.price}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                <Star size={14} className="fill-amber-400 text-amber-400" />
                                <span>{product.rating}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-end gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="icon" variant="ghost" onClick={() => setEditingProduct(product)}>
                                      <Edit2 size={16} />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Edit Product</DialogTitle>
                                    </DialogHeader>
                                    {editingProduct && (
                                      <div className="space-y-4 pt-4">
                                        <div>
                                          <Label>Name</Label>
                                          <Input 
                                            value={editingProduct.name} 
                                            onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                                          />
                                        </div>
                                        <div>
                                          <Label>Description</Label>
                                          <Textarea 
                                            value={editingProduct.description} 
                                            onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                                            rows={3}
                                          />
                                        </div>
                                        <div>
                                          <Label>Price</Label>
                                          <Input 
                                            type="number" 
                                            value={editingProduct.price} 
                                            onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                                          />
                                        </div>
                                        <Button onClick={handleUpdateProduct} className="w-full">Save Changes</Button>
                                      </div>
                                    )}
                                  </DialogContent>
                                </Dialog>
                                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDeleteProduct(product.id)}>
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle>User Management</CardTitle>
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <Input 
                        placeholder="Search users..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Joined</th>
                          <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((u) => (
                          <tr key={u.id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full" />
                                <span className="font-medium">{u.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">{u.email}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-sm ${u.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'}`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {new Date(u.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-end gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="icon" variant="ghost" onClick={() => setEditingUser(u)}>
                                      <Edit2 size={16} />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Edit User</DialogTitle>
                                    </DialogHeader>
                                    {editingUser && (
                                      <div className="space-y-4 pt-4">
                                        <div>
                                          <Label>Name</Label>
                                          <Input 
                                            value={editingUser.name} 
                                            onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                                          />
                                        </div>
                                        <div>
                                          <Label>Email</Label>
                                          <Input 
                                            value={editingUser.email} 
                                            onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                                          />
                                        </div>
                                        <div>
                                          <Label>Role</Label>
                                          <Select 
                                            value={editingUser.role} 
                                            onValueChange={(v) => setEditingUser({...editingUser, role: v as 'customer' | 'admin'})}
                                          >
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="customer">Customer</SelectItem>
                                              <SelectItem value="admin">Admin</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <Button onClick={handleUpdateUser} className="w-full">Save Changes</Button>
                                      </div>
                                    )}
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Review Management</CardTitle>
                </CardHeader>
                <CardContent>
                  {allReviews.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No reviews yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {allReviews.map((review, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                          <img src={review.avatar} alt={review.userName} className="w-10 h-10 rounded-full" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{review.userName}</p>
                                <p className="text-sm text-muted-foreground">on {review.productName}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      size={14} 
                                      className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'} 
                                    />
                                  ))}
                                </div>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="text-destructive"
                                  onClick={() => handleDeleteReview(review.productId, review.reviewIndex)}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </div>
                            <p className="text-muted-foreground mt-2">{review.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Strategies Tab */}
            <TabsContent value="strategies">
              <Card>
                <CardHeader>
                  <CardTitle>Marketing Strategies & Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <TrendingUp size={18} className="text-primary" /> Growth Strategies
                      </h3>
                      <div className="space-y-3">
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                          <p className="font-medium text-emerald-700 dark:text-emerald-300">Social Media Campaign</p>
                          <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">Increase TikTok presence with eco-friendly messaging. Target: 50M views by Q2</p>
                        </div>
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                          <p className="font-medium text-blue-700 dark:text-blue-300">Influencer Partnerships</p>
                          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Partner with 10 eco-conscious influencers for product reviews</p>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                          <p className="font-medium text-purple-700 dark:text-purple-300">Subscription Model</p>
                          <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">Launch monthly subscription boxes with 15% discount</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <AlertCircle size={18} className="text-amber-500" /> Key Insights
                      </h3>
                      <div className="space-y-3">
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                          <p className="font-medium text-amber-700 dark:text-amber-300">Best Seller</p>
                          <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">Lavender Calm sheets leading with 45% of total sales</p>
                        </div>
                        <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl border border-rose-200 dark:border-rose-800">
                          <p className="font-medium text-rose-700 dark:text-rose-300">Customer Feedback</p>
                          <p className="text-sm text-rose-600 dark:text-rose-400 mt-1">92% customers love the portable packaging design</p>
                        </div>
                        <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
                          <p className="font-medium text-cyan-700 dark:text-cyan-300">Market Trend</p>
                          <p className="text-sm text-cyan-600 dark:text-cyan-400 mt-1">Eco-friendly products up 35% YoY in hygiene sector</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Label>Add New Note</Label>
                    <Textarea placeholder="Write your marketing notes or strategies here..." className="mt-2" rows={4} />
                    <Button className="mt-3">Save Note</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </main>
  );
};

export default AdminDashboard;
