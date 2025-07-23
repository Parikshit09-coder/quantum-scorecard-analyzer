import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, ExternalLink, Shield, Settings, Users, BarChart3, Activity, Zap } from 'lucide-react';

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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'supervisor':
        return Shield;
      case 'production_manager':
        return Settings;
      case 'operator':
        return Users;
      default:
        return Users;
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

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'supervisor':
        return 'Full system oversight and management access';
      case 'production_manager':
        return 'Production monitoring and control capabilities';
      case 'operator':
        return 'Equipment operation and monitoring tools';
      default:
        return 'System access';
    }
  };

  const RoleIcon = getRoleIcon(user.role);

  const features = [
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Monitor system performance metrics in real-time"
    },
    {
      icon: Activity,
      title: "System Health",
      description: "Track operational status and system diagnostics"
    },
    {
      icon: Zap,
      title: "Performance Insights",
      description: "Analyze trends and optimize system efficiency"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg gradient-primary">
                  <RoleIcon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">IOT Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Industrial Monitoring System</p>
                </div>
              </div>
              <Badge variant={getRoleVariant(user.role) as any} className="ml-4">
                {getRoleDisplay(user.role)}
              </Badge>
            </div>
            <Button onClick={handleLogout} variant="outline" className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-8">
          
          {/* Welcome Section */}
          <Card className="floating-card gradient-surface border-border/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl gradient-primary">
                    <RoleIcon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Welcome back, {user.email}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      {getRoleDescription(user.role)}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={redirectToGrafana} 
                className="w-full gradient-primary text-primary-foreground font-medium shadow-glow hover:scale-[1.02] transition-all duration-200 h-12"
                size="lg"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Open Grafana Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="floating-card glass-effect border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* System Status */}
          <Card className="floating-card glass-effect border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>System Status</span>
              </CardTitle>
              <CardDescription>
                All systems operational and ready for monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium">Connected to Grafana Dashboard</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;