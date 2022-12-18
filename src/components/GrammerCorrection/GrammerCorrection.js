import React, { useState } from "react";
import "./GrammarCorrection.css";
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const GrammerCorrection = () => {
  const [wrongFormat, setWrongFormat] = useState("");
  const [rightFormat, setRightFormat] = useState("");

  const handleChange = () => {
    const wrongText = document.getElementById("wrong-text").value;
    setWrongFormat(wrongText);
  };

  const getResponse = async () => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Correct this to standard English:\n\n${wrongFormat}`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    const responseCorrect = response?.data?.choices[0]?.text;
    setRightFormat(responseCorrect);
  };

  const handleClick = () => {
    getResponse();
  };

  return (
    <div className="grid gap-4 items-center content-center p-4">
      <h2 className="text-center text-2xl p-2">Grammar Correction</h2>
      <textarea
        className="p-2 text-center rounded-2xl"
        placeholder="type wrong sentenses here!"
        onChange={handleChange}
        name="wrong-text"
        id="wrong-text"
        cols="10"
        rows="5"
      ></textarea>
      <button className="btn text-white mx-4" onClick={handleClick}>
        let's go!
      </button>
      <textarea
        disabled
        className="p-2 text-center rounded-2xl"
        placeholder="right sentenses will appear here!"
        defaultValue={rightFormat}
        cols="10"
        rows="5"
      ></textarea>
      {/* <p className="text-center text-white">{rightFormat}</p> */}
    </div>
  );
};

export default GrammerCorrection;
