"use client";

import {
  ConnectWallet,
  useAddress,
  useConnectionStatus,
} from "@thirdweb-dev/react";
import { useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

type Inputs = {
  nickname: string;
};

const Content = ({ event_id }: { event_id: string }) => {
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    toast.dismiss();
    setErrorMessage("");
    try {
      if (!address) {
        throw new Error("Not founded address");
      }
      if (!data.nickname) {
        throw new Error("Not founded nickname");
      }

      if (process.env.NEXT_PUBLIC_URL === undefined) {
        throw new Error("Not founded NEXT_PUBLIC_URL");
      }
      const pendingToast = toast.loading("pending...");

      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event_id,
          walletAddress: address,
          nickname: data.nickname,
        }),
      }).then(async (res) => {
        if (res.status !== 200) {
          toast.dismiss(pendingToast);
          setErrorMessage(await res.json());
          throw new Error(res.statusText);
        }
        return res.json();
      });
      // success modal
      toast.dismiss(pendingToast);
      toast.success("Success");
    } catch (error: unknown) {
      console.error(error);
      toast.error("Error");
    }

    setTimeout(() => {
      toast.dismiss();
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
      <Toaster
        reverseOrder={true}
        containerStyle={{
          top: 450,
        }}
      />
      <div className="flex mt-5 flex-col justify-center gap-5 items-center w-full">
        <p className="text-white">
          Event Number :　
          <span className="font-bold text-xl">{event_id}</span>
        </p>
      </div>
      <div className="flex flex-col justify-center gap-5 items-center w-full">
        <ConnectWallet />
        <input
          type="text"
          className="rounded-lg p-2 text-black"
          placeholder="NickName"
          {...register("nickname", { required: "ニックネームは必須です" })}
        />
        {errors.nickname && (
          <span className="text-red-500">{errors.nickname.message}</span>
        )}
      </div>
      <div className="flex justify-center">
        {connectionStatus === "unknown" || connectionStatus === "connecting" ? (
          <div className="p-2 w-24 h-10 animate-pulse rounded-lg bg-gray-800" />
        ) : (
          <>
            {connectionStatus === "connected" ? (
              <button
                className="bg-blue-500 text-white p-2 rounded-lg w-24"
                type="submit"
              >
                Submit
              </button>
            ) : (
              <div className="w-36 h-12 flex justify-center items-center">
                <p>Not Connected</p>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex justify-center">
        {errorMessage && (
          <>
            <p className="text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
};

export default Content;
