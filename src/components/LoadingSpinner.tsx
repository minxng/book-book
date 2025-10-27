export default function LoadingSpinner() {
  return (
    <div className="w-full min-h-[300px] flex justify-center items-center">
      <span className="w-12 h-12 border-[5px] border-white border-b-primary rounded-full inline-block box-border animate-spin" />
    </div>
  );
}
