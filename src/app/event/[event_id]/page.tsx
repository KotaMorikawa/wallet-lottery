import Content from "@/components/Content";
import Header from "@/components/Header";

const page = ({ params }: { params: { event_id: string } }) => {
  const { event_id } = params;

  return (
    <div className="mx-auto max-w-xl p-5">
      <Header />
      <Content event_id={event_id} />
    </div>
  );
};

export default page;
