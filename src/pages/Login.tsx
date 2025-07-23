import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Shield, Users, Settings, Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
  role: z.string().min(1, 'Please select a role'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: '',
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

  const roles = [
    { value: "supervisor", label: "Supervisor", email: "harsh@gmail.com" },
    { value: "production_manager", label: "Production Manager", email: "atharvgmail.com" },
    { value: "operator", label: "Operator", email: "parikshit@gmail.com" }
  ];

  const handleRoleChange = (roleValue: string) => {
    setSelectedRole(roleValue);
    const selectedRoleData = roles.find(role => role.value === roleValue);
    if (selectedRoleData) {
      form.setValue('email', selectedRoleData.email);
    }
    form.setValue('role', roleValue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="flex justify-center">
        <Card className="w-full max-w-md floating-card glass-effect">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
              IOT Dashboard
            </CardTitle>
            <CardDescription className="text-base">
              Select your role and enter credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Role</FormLabel>
                      <Select onValueChange={handleRoleChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors">
                            <SelectValue placeholder="Choose your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-border">
                          {roles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {selectedRole && (
                  <>
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
                              readOnly
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
                                placeholder="Enter your password (12345)" 
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
                  </>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full h-11 gradient-primary text-primary-foreground font-medium shadow-glow hover:scale-[1.02] transition-all duration-200"
                  disabled={!selectedRole}
                >
                  Sign In
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;