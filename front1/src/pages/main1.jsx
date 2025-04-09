import Banner from "../components/Banner.jsx";
import Rank from "../components/rank.jsx";
import MdPickSection from "../components/MdPickSection.jsx";
import GenreRanking from "../components/perfoAll.jsx";


function Main1() {
    return (
       <div>
           <Banner/>
           <Rank/>
           <div className="max-w-7xl mx-auto px-4 py-8">
               <MdPickSection />
           </div>
           <GenreRanking/>
       </div>
     );
}

export default Main1;