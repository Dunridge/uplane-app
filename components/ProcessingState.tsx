import Spinner from "./Spinner";

type Props = {
  message?: string;
};

export default function ProcessingState({
  message = "Processing image...",
}: Props) {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-xl border bg-white p-10 shadow-sm">
      <Spinner />
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
}
