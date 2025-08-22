import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { type UseFormReturn } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";
import { type FC } from "react";
import { SIGNIN_PATH } from "@/root/routes-constants";
import { type SignInFormSchema } from "@/features/signin/schema";

interface SignInFormProps {
  signInForm: UseFormReturn<z.infer<typeof SignInFormSchema>>;
  isLoading: boolean;
  handleSubmit: (values: z.infer<typeof SignInFormSchema>) => Promise<void>;
}

const SignInForm: FC<SignInFormProps> = ({ signInForm, isLoading, handleSubmit }) => {
  return (
    <Form {...signInForm}>
      <form onSubmit={signInForm.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="text-balance text-sm text-muted-foreground">Enter your email below to login to your account</p>
        </div>
        <div className="grid gap-4">
          <FormField
            control={signInForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="wheelio@xyz.com" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signInForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="********" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            Sign In
          </Button>
          <Separator />
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to={SIGNIN_PATH} className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
