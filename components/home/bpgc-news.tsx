import { getBpgcNews } from "@/lib/actions/siteSettings.actions";

const BpgcNews = async () => {
  // Uncomment for delay to test suspense layout
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const result = await getBpgcNews();
  if (!result.success) {
    return (
      <p className="w-[400px] m-auto text-lg">
        <em>ANY IMPORTANT NEWS OR UPDATES WILL BE POSTED HERE</em>
      </p>
    );
  } else {
    return (
      <p className="w-full max-w-[400px] m-auto text-lg break-words">
        <em>{result.data}</em>
      </p>
    );
  }
};

export default BpgcNews;
