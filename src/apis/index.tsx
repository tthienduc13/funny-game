import axios from "axios";

export const fetchQuestion = () => {
  axios.get("https://opentdb.com/api.php?amount=2&type=multiple");
};
