'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LoginFormInput, loginSchema } from '@/schemas/user.schema';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { PasswordInput } from '@/components/passwordInput';
import { Loader2 } from 'lucide-react';
import { useMutation } from '@apollo/client/react';
import { LOGIN_MUTATION } from '@/graphql/user/mutation';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const form = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormInput) => {
    try {
      const { data } = await login({
        variables: {
          input: values,
        },
      });

      if (!data?.login?.id) {
        toast.error('Login failed. Please try again.');
        return;
      }

      toast.success('Login successful!');
      form.reset();
      router.replace('/');
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to login';
      toast.error(message);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 md:p-8 w-full"
          >
            <FieldGroup>
              <FieldSet>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                      Login to your Primetrade account
                    </p>
                  </div>

                  {/* Email */}
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      autoFocus
                      {...form.register('email')}
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.email.message as string}
                      </p>
                    )}
                  </Field>

                  {/* Password */}
                  <Field>
                    <PasswordInput
                      id="password"
                      placeholder="••••••••"
                      {...form.register('password')}
                    />
                    {form.formState.errors.password && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.password.message as string}
                      </p>
                    )}
                  </Field>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="w-full cursor-pointer"
                      disabled={form.formState.isSubmitting || loading}
                    >
                      {form.formState.isSubmitting || loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Logging in...
                        </span>
                      ) : (
                        'Login'
                      )}
                    </Button>
                  </div>

                  <div className="text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link
                      href="/signup"
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </FieldSet>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
