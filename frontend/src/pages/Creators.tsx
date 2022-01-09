import CreatorCard from "../components/ui/CreatorCard";

const creatorsData = [
  {
    email: "l1821012020@ogr.sdu.edu.tr",
    image: "/merve.jpg",
    location: "Edirne",
    name: "Artun Çolak",
    no: "1821012020",
  },
  {
    email: "l1821012012@ogr.sdu.edu.tr",
    image: "/merve.jpg",
    location: "Edirne",
    name: "Merve Sezer",
    no: "1821012012",
  },
  {
    email: "l1821012010@ogr.sdu.edu.tr",
    image: "/merve.jpg",
    location: "Demre",
    name: "Osman Avcı",
    no: "1821012010",
  },
];

export default function Creators() {
  return (
    <div className="flex justify-around items-center h-full">
      {creatorsData.map(({ email, image, location, name, no }) => (
        <CreatorCard
          email={email}
          image={image}
          location={location}
          name={name}
          no={no}
        />
      ))}
    </div>
  );
}
