import { Suspense } from "react";
import Extras from "@/components/Extras";
import Flights from "@/components/Flights";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Filters from "@/components/Filters";
import Search from "@/components/Search";

const Home = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row grow gap-4">
      <section className="flex flex-col gap-4 grow">
        <Search />

        <section className="flex flex-col-reverse md:flex-row gap-4">
          <Suspense fallback={<Loading />}>
            <Error>
              <Flights />
            </Error>
          </Suspense>

          <Filters />
        </section>
      </section>
      
      <Extras />
    </div>
  );
};

export default Home;
