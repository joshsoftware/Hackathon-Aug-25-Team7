import SignInForm from "@/features/signin/components/SignInForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInFormSchema } from "@/features/signin/schema";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";
import { loginService } from "@/services/auth";
import { setAccessToken, setUserData } from "@/shared/utils/local-storage";
import { useMutation } from "@tanstack/react-query";
import { HOME_PATH } from "@/root/routes-constants";

const SignInContainer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const callback = searchParams.get("callback");

  const signInForm = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginService,
    onSuccess: (response) => {
      const { access_token, user } = response.data;

      setAccessToken(access_token);
      setUserData(user);
    },
  });

  const handleSignIn = async (values: z.infer<typeof SignInFormSchema>) => {
    login(values, {
      onSuccess: () => {
        toast.success("Signed in successfully");
        signInForm.reset();
        navigate(callback || HOME_PATH);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to sign in");
      },
    });
  };

  return <SignInForm signInForm={signInForm} isLoading={isPending} handleSubmit={handleSignIn} />;
};

export default SignInContainer;
