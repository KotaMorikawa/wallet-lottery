import Header from "@/components/Header";
import Lottery from "@/components/Lottery";

const page = ({ params }: { params: { event_id: string } }) => {
  const { event_id } = params;

  return (
    <div className="mx-auto max-w-xl p-5">
      <Header />
      {/* Lottely Area*/}
      <Lottery event_id={event_id} />
    </div>
  );
};

export default page;
