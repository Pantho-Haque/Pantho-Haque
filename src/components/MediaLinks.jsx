
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";

export default function MediaLinks() {
  return (
    <ul className="flex justify-center mt-5 space-x-5">
      <li>
        <a href="https://www.facebook.com/panhohaque75" target="_blank">
          <AiFillFacebook className="cursor-pointer text-4xl text-slate-200" />
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/pan_da_pantho/" target="_blank">
          <AiFillInstagram className="cursor-pointer text-4xl text-slate-200" />
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/panthohaque/" target="_blank">
          <AiFillLinkedin className="cursor-pointer text-4xl text-slate-200" />
        </a>
      </li>
    </ul>
  );
}
