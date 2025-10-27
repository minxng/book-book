import Banner from "@/components/Banner";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function loading() {
  return (
    <div className="container-style my-0">
      <Banner />
      <LoadingSpinner />
    </div>
  );
}
