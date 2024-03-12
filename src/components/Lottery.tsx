"use client";

import { useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

type Inputs = {
  count: number;
};

type User = {
  event_id: number;
  nickname: string;
  walletAddress: string;
  createdAt: string;
  updatedAt: string;
};

const Lottery = ({ event_id }: { event_id: string }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [lotteryResult, setLotteryResult] = useState<Array<User>>([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    toast.dismiss();
    setErrorMessage("");
    const { count } = data;
    try {
      if (!count) {
        throw new Error("Not founded count");
      }
      if (!event_id) {
        throw new Error("Not founded event_id");
      }

      if (process.env.NEXT_PUBLIC_URL === undefined) {
        throw new Error("Not founded NEXT_PUBLIC_URL");
      }

      const pendingToast = toast.loading("pending...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/lottery`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId: event_id,
            count: count,
          }),
        }
      ).then(async (res) => {
        if (res.status !== 200) {
          toast.dismiss(pendingToast);
          setErrorMessage(await res.json());
          throw new Error(res.statusText);
        }
        return res.json();
      });
      // success modal
      setTimeout(() => {
        toast.dismiss(pendingToast);
        toast.success("Success");
        setLotteryResult(response.lotteryWinners);
      }, 3000);
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
      <Toaster position="top-right" reverseOrder={true} />
      <div className="flex mt-5 flex-col justify-center gap-5 items-center w-full">
        <p className="text-white">
          Event Number :　
          <span className="font-bold text-xl">{event_id}</span>
        </p>
      </div>
      <div className="flex flex-col justify-center gap-5 items-center w-full">
        <input
          type="text"
          className="rounded-lg p-2 text-black"
          placeholder="count"
          {...register("count", { required: "カウントは必須です" })}
        />
        {errors.count && (
          <span className="text-red-500">{errors.count.message}</span>
        )}
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 text-white p-2 rounded-lg w-24"
          type="submit"
        >
          Lottery
        </button>
      </div>
      <div className="flex justify-center">
        {errorMessage && (
          <>
            <p className="text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
      <div className="flex flex-col justify-center gap-5 items-center w-full">
        {lotteryResult.length > 0 && (
          <div className="flex flex-col gap-y-5">
            <h2 className="text-2xl font-bold text-white">Result</h2>
            <div className="gap-y-5 flex flex-col">
              {lotteryResult.map((user, index) => (
                <div
                  key={index}
                  className="border text-xl p-2 border-white rounded-lg"
                >
                  <p>{user.nickname}</p>
                  <p>{user.walletAddress}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default Lottery;
