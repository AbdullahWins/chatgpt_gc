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

  console.log(wrongFormat);

  return (
    <div className="grid items-center content-center">
      <h2 className="text-center text-2xl p-2">Grammar Correction</h2>
      <textarea
        className="p-2 text-center"
        onChange={handleChange}
        name="wrong-text"
        id="wrong-text"
        cols="10"
        rows="10"
      ></textarea>
      <button className="btn text-white" onClick={handleClick}>
        let's go!
      </button>
      <p className="text-center text-white">{rightFormat}</p>
    </div>
  );
};

export default GrammerCorrection;
