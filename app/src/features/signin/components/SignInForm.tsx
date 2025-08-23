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
      <form
        onSubmit={signInForm.handleSubmit(handleSubmit)}
        className="min-h-screen flex flex-col items-center justify-center py-6 px-4 bg-gray-50"
      >
        <div className="w-full max-w-[480px]">
          <div className="flex flex-col items-center mb-8">
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-slate-900 text-center text-3xl font-semibold">
              Log In
            </h1>
            <p className="text-slate-500 text-center mt-2 text-sm">
              Enter your email below to login to your account
            </p>

            <div className="mt-8 space-y-6">
              <FormField
                control={signInForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-900 text-sm font-medium mb-2 block">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="wheelio@xyz.com"
                        disabled={isLoading}
                        {...field}
                        className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                      />
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
                    <FormLabel className="text-slate-900 text-sm font-medium mb-2 block">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        disabled={isLoading}
                        {...field}
                        className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-slate-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="javascript:void(0);"
                    className="text-blue-600 hover:underline font-semibold"
                  >

                  </a>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-3 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                disabled={isLoading}
              >
                Sign In
              </Button>

              <Separator />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
