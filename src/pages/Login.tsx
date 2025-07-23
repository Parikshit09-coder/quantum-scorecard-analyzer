import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Shield, Users, Settings, Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const success = login(values.email, values.password);
    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome! Redirecting to dashboard...",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const roleCards = [
    {
      icon: Shield,
      title: "Supervisor",
      email: "harsh@gmail.com",
      description: "Full system oversight and management access",
      bgGradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      icon: Settings,
      title: "Production Manager", 
      email: "atharvgmail.com",
      description: "Production monitoring and control",
      bgGradient: "from-green-500/20 to-blue-500/20"
    },
    {
      icon: Users,
      title: "Operator",
      email: "parikshit@gmail.com", 
      description: "Equipment operation and monitoring",
      bgGradient: "from-orange-500/20 to-red-500/20"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left side - Login Form */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md floating-card glass-effect">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                IOT Dashboard
              </CardTitle>
              <CardDescription className="text-base">
                Enter your credentials to access the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your email" 
                            className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Enter your password" 
                              className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors pr-10" 
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-11 gradient-primary text-primary-foreground font-medium shadow-glow hover:scale-[1.02] transition-all duration-200">
                    Sign In
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Role Information */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold mb-2">System Access Levels</h2>
            <p className="text-muted-foreground">Choose your role to access the appropriate dashboard features</p>
          </div>
          
          <div className="grid gap-4">
            {roleCards.map((role, index) => (
              <Card key={index} className={`floating-card cursor-pointer bg-gradient-to-r ${role.bgGradient} border-border/50 hover:border-primary/50 transition-all duration-300`}>
                <CardContent className="flex items-center p-4">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="p-2 rounded-lg bg-background/20">
                      <role.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{role.title}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                      <p className="text-xs text-primary font-medium mt-1">{role.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center lg:text-left">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Default Password:</span> 12345
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;