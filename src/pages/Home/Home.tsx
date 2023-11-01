import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div>Home</div>
      <div>
        <Link to={"/list"}>List</Link>
      </div>
    </>
  );
}
