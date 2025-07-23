import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const redirectToGrafana = () => {
    window.open('https://myiot9876.grafana.net/public-dashboards/0d7c298e08364c00a8e1906349c06df1', '_blank');
  };

  if (!user) {
    return null;
  }

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'supervisor':
        return 'Supervisor';
      case 'production_manager':
        return 'Production Manager';
      case 'operator':
        return 'Operator';
      default:
        return role;
    }
  };

  const getRoleVariant = (role: string) => {
    switch (role) {
      case 'supervisor':
        return 'default';
      case 'production_manager':
        return 'secondary';
      case 'operator':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Badge variant={getRoleVariant(user.role) as any}>
              {getRoleDisplay(user.role)}
            </Badge>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {user.email}</CardTitle>
              <CardDescription>
                You are logged in as a {getRoleDisplay(user.role)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={redirectToGrafana} className="w-full" size="lg">
                Open Grafana Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;