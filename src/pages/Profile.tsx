import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Camera, Save } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      email: formData.email,
    });
    setIsEditing(false);
  };

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl font-medium text-foreground mb-8">
            My Profile
          </h1>

          {/* Avatar Section */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-24 h-24 rounded-full border-4 border-primary/20"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Camera size={16} />
              </button>
            </div>
            <div>
              <h2 className="font-display text-2xl font-medium">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full capitalize">
                {user?.role}
              </span>
            </div>
          </div>

          {/* Profile Form */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-xl font-medium">Account Details</h3>
              {!isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    id="password"
                    type="password"
                    value="••••••••"
                    disabled
                    className="pl-10"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Contact support to change your password
                </p>
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <Button onClick={handleSave}>
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ name: user?.name || '', email: user?.email || '' });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Account Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <p className="text-3xl font-bold text-primary">0</p>
              <p className="text-sm text-muted-foreground mt-1">Orders</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <p className="text-3xl font-bold text-primary">0</p>
              <p className="text-sm text-muted-foreground mt-1">Reviews</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <p className="text-3xl font-bold text-primary">0</p>
              <p className="text-sm text-muted-foreground mt-1">Wishlist</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Profile;
