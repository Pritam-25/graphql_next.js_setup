'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { SignupFormInput, signupSchema } from '@/schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { PasswordInput } from '@/components/passwordInput';
import { Loader2 } from 'lucide-react';
import { useMutation } from '@apollo/client/react';
import { SIGNUP_MUTATION } from '@/graphql/user/mutation';

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();

  const [signup, { loading }] = useMutation(SIGNUP_MUTATION);

  const form = useForm<SignupFormInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const onSubmit = async (values: SignupFormInput) => {
    try {
      const { data } = await signup({
        variables: {
          input: values,
        },
      });

      if (!data?.signup?.id) {
        toast.error('Signup failed. Please try again.');
        return;
      }

      toast.success('Account created successfully. Please log in.');
      form.reset();
      router.replace('/login');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to sign up';
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
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-muted-foreground text-balance">
                      Sign up to start using Primetrade
                    </p>
                  </div>

                  {/* Name */}
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      placeholder="Your name"
                      autoFocus
                      {...form.register('name')}
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.name.message as string}
                      </p>
                    )}
                  </Field>

                  {/* Email */}
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
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
                    <FieldLabel htmlFor="password">Password</FieldLabel>
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
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Signing up...
                        </span>
                      ) : (
                        'Sign Up'
                      )}
                    </Button>
                  </div>

                  <div className="text-center text-sm">
                    Already have an account?{' '}
                    <Link
                      href="/login"
                      className="underline underline-offset-4"
                    >
                      Log in
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
