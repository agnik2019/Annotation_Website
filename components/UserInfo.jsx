"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Openright from "@/components/Openright";
import Closeright from "@/components/Closeright";

import React, { useState, useEffect, useRef } from "react";

const getTopics = async (myemail) => {
  try {
    const res = await fetch(`/api/usertwos/${myemail}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

const UserInfo = () => {
  const { data: session } = useSession();
  const myemail = session?.user?.email;
  const [topics, setTopics] = useState([]);

  const [isrightOpen, setIsRightOpen] = useState(false);

  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);

  const [isVisible, setIsVisible] = useState(false);

  const [score1, setScore1] = useState("");
  const [comments1, setComments1] = useState("");

  const [score2, setScore2] = useState("");
  const [comments2, setComments2] = useState("");

  const [score3, setScore3] = useState("");
  const [comments3, setComments3] = useState("");

  const [score4, setScore4] = useState("");
  const [comments4, setComments4] = useState("");

  const [score5, setScore5] = useState("");
  const [comments5, setComments5] = useState("");

  const [score6, setScore6] = useState("");
  const [comments6, setComments6] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!session) {
      signOut();
    }
  }, [session]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (topics[currentTopicIndex]?.annotate) {
      const currentAnnotate = topics[currentTopicIndex].annotate;

      // Restore radio button selections
      setScore1(currentAnnotate.score1 || "");
      setComments1(currentAnnotate.comment1 || "");

      setScore2(currentAnnotate.score2 || "");
      setComments2(currentAnnotate.comment2 || "");

      setScore3(currentAnnotate.score3 || "");
      setComments3(currentAnnotate.comment3 || "");

      setScore4(currentAnnotate.score4 || "");
      setComments4(currentAnnotate.comment4 || "");

      setScore5(currentAnnotate.score5 || "");
      setComments5(currentAnnotate.comment5 || "");

      setScore6(currentAnnotate.score6 || "");
      setComments6(currentAnnotate.comment6 || "");
    }
  }, [currentTopicIndex, topics]);

  const handleScore1Change = (event) => {
    setScore1(event.target.value);
  };
  const handleComments1Change = (event) => {
    setComments1(event.target.value);
  };

  const handleScore2Change = (event) => {
    setScore2(event.target.value);
  };
  const handleComments2Change = (event) => {
    setComments2(event.target.value);
  };

  const handleScore3Change = (event) => {
    setScore3(event.target.value);
  };
  const handleComments3Change = (event) => {
    setComments3(event.target.value);
  };

  const handleScore4Change = (event) => {
    setScore4(event.target.value);
  };
  const handleComments4Change = (event) => {
    setComments4(event.target.value);
  };

  const handleScore5Change = (event) => {
    setScore5(event.target.value);
  };
  const handleComments5Change = (event) => {
    setComments5(event.target.value);
  };

  const handleScore6Change = (event) => {
    setScore6(event.target.value);
  };
  const handleComments6Change = (event) => {
    setComments6(event.target.value);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentTopicIndex]);

  useEffect(() => {
    getTopics(myemail)
      .then((data) => {
        setTopics(data.topic);
      })
      .catch((error) => {
        console.error("Error loading topics: ", error);
      });
  }, []);

  const submitCurrentQuestion = async () => {
    topics[currentTopicIndex].annotate.score1 = score1;
    topics[currentTopicIndex].annotate.comment1 = comments1;
    topics[currentTopicIndex].annotate.score2 = score2;
    topics[currentTopicIndex].annotate.comment2 = comments2;
    topics[currentTopicIndex].annotate.score3 = score3;
    topics[currentTopicIndex].annotate.comment3 = comments3;
    topics[currentTopicIndex].annotate.score4 = score4;
    topics[currentTopicIndex].annotate.comment4 = comments4;
    topics[currentTopicIndex].annotate.score5 = score5;
    topics[currentTopicIndex].annotate.comment5 = comments5;
    topics[currentTopicIndex].annotate.score6 = score6;
    topics[currentTopicIndex].annotate.comment6 = comments6;
    topics[currentTopicIndex].edited = "yes";
    topics[currentTopicIndex].answered = "Answered";

    const obj = {
      questionSerial: topics[currentTopicIndex].serial,
      annotate: {
        question: topics[currentTopicIndex].annotate.question,
        score1: topics[currentTopicIndex].annotate.score1,
        comment1: topics[currentTopicIndex].annotate.comment1,
        score2: topics[currentTopicIndex].annotate.score2,
        comment2: topics[currentTopicIndex].annotate.comment2,
        score3: topics[currentTopicIndex].annotate.score3,
        comment3: topics[currentTopicIndex].annotate.comment3,
        score4: topics[currentTopicIndex].annotate.score4,
        comment4: topics[currentTopicIndex].annotate.comment4,
        score5: topics[currentTopicIndex].annotate.score5,
        comment5: topics[currentTopicIndex].annotate.comment5,
        score6: topics[currentTopicIndex].annotate.score6,
        comment6: topics[currentTopicIndex].annotate.comment6,
      },
      answered: topics[currentTopicIndex].answered,
      edited: topics[currentTopicIndex].edited,
    };

    const response = await fetch(`/api/usertwos/${myemail}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error(`Failed to update topic: ${response.statusText}`);
    }

    await response.json();
    setShowAlert(true);
  };

  // Navigation handlers
  const handleNextClick = async () => {
    // if (currentTopicIndex < topics.length - 1) {
    //   try {
    //     await submitCurrentQuestion();
    //     setCurrentTopicIndex(currentTopicIndex + 1);
    //     setIsVisible(false);
    //   } catch (error) {
    //     setShowAlert(false);
    //     console.log("Error updating topic: ", error);
    //   }
    // }
    try {
      await submitCurrentQuestion();
      setCurrentTopicIndex((idx) =>
        /* if we're at the last index, go to 0, else +1 */
        idx === topics.length - 1 ? 0 : idx + 1
      );
      setIsVisible(false);
    } catch (error) {
      setShowAlert(false);
      console.log("Error updating topic: ", error);
    }
  };

  const handleBackClick = async () => {
    // if (currentTopicIndex > 0) {
    //   try {
    //     await submitCurrentQuestion();
    //     setCurrentTopicIndex(currentTopicIndex - 1);
    //     setIsVisible(false);
    //   } catch (error) {
    //     setShowAlert(false);
    //     console.log("Error updating topic: ", error);
    //   }
    // }
    try {
      await submitCurrentQuestion();
      setCurrentTopicIndex((idx) => (idx === 0 ? topics.length - 1 : idx - 1));
      setIsVisible(false);
    } catch (error) {
      setShowAlert(false);
      console.log("Error updating topic: ", error);
    }
  };

  const handleClick = (index) => {
    setCurrentTopicIndex(index);
  };

const renderQuestionContent = (rawQuestion) => {
  // --- 1) Parse (handles string or already-parsed array) ---
  let question = rawQuestion;
  try {
    if (typeof question === "string") {
      question = JSON.parse(question);
      if (typeof question === "string" && /^\s*[\[\{]/.test(question)) {
        question = JSON.parse(question);
      }
    }
  } catch (_err) {
    return <p className="text-red-500">Invalid question format</p>;
  }

  if (!Array.isArray(question) || question.length !== 2) {
    return <p>{String(question)}</p>; // fallback
  }

  const [profileText, dialogueObj] = question;
  const dialogues = dialogueObj?.dialogue || [];

  // --- 2) Pretty format the profile text into sections ---
  const lines = String(profileText)
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const isHeader = (l) =>
    /^(Patient Profile:|Stage of Change:|Intrapersonal Factors:|Interpersonal Factors:|Health Belief Factors:|Patient age:)\s*/i.test(
      l
    );

  const sections = [];
  let current = { title: "Patient Profile", items: [] };

  lines.forEach((line) => {
    if (isHeader(line)) {
      if (current.items.length) sections.push(current);

      const title = line.replace(/\s*:\s*$/, "");
      current = { title, items: [] };
    } else {
      current.items.push(line.replace(/^\-\s*/, "").trim());
    }
  });

  if (current.items.length || sections.length === 0) sections.push(current);

  // --- 3) Render ---
  return (
    <div className="space-y-6">
      {/* Patient Profile */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">Patient Profile</h3>
        <div className="space-y-3">
          {sections.map((sec, i) => (
            <div key={i}>
              {sec.title && sec.title !== "Patient Profile" && (
                <h4 className="font-medium text-blue-700 mb-1">{sec.title}</h4>
              )}

              {/* special case for Patient age */}
              {sec.title === "Patient age" ? (
                <p className="text-sm text-gray-700">
                  {sec.items.join(" ").replace(/\s+/g, " ").trim()}
                </p>
              ) : (
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {sec.items.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dialogue */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800">Dialogue</h3>
        {dialogues.map((item, idx) => (
          <div key={idx} className="space-y-2">
            {item.assistant && (
              <div className="bg-green-100 p-3 rounded-md text-sm">
                <strong className="text-green-800">Assistant:</strong>{" "}
                {item.assistant}
              </div>
            )}
            {item.user && (
              <div className="bg-gray-100 p-3 rounded-md text-sm">
                <strong className="text-gray-800">User:</strong> {item.user}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


  return (
    <>
      {topics.length > 0 && (
        <div className="pr-6 h-screen">
          <nav className="w-full bg-white px-6 py-2">
            <div
              className={`flex justify-between rounded-2xl ${
                topics[currentTopicIndex].answered === "Answered"
                  ? "bg-green-200"
                  : "bg-pink-200"
              }`}
            >
              <h1 className="p-4 text-lg">
                {topics[currentTopicIndex].serial}
              </h1>
              <h3 className="text-green-400 p-4 text-lg font-bold">
                {topics[currentTopicIndex].answered}
              </h3>
              <button
                onClick={() => signOut()}
                className="bg-red-500 rounded-lg flex text-white justify-center items-center space-x-2 p-2 m-2"
              >
                <p>Log out</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-log-out"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
              </button>
            </div>

            {/* <div className="space-x-3 text-md">
              <h1>Question</h1>
              <h2 className=" bg-emerald-100 p-2 w-fit rounded-md mb-1">
                {topics[currentTopicIndex].annotate.question}
              </h2>
            </div> */}

            <div className="space-x-3 text-md">
              <h1 className="text-lg font-semibold mb-2">Question</h1>
              <div className="bg-emerald-50 p-3 rounded-md border border-emerald-200 mb-4 max-h-[400px] overflow-y-auto">
                {renderQuestionContent(
                  topics[currentTopicIndex].annotate.question
                )}
              </div>
            </div>
          </nav>

          <div
            className="overflow-scroll bg-stone-100 border-b-2 h-96 border-t-2 border-dashed border-slate-600 pb-28"
            ref={scrollRef}
          >
            <div className="justify-center space-y-2 p-3">
              <div className="space-x-3 text-md">
                <h2 className="bg-gray-200 p-2 w-fit rounded-md mb-1">
                  <b>1 )</b> Did the model provide accurate information in
                  general?
                </h2>
              </div>
              <form className="flex bg-stone-200 flex-col border border-dashed border-gray-600 rounded p-3 flex-grow">
                <div className="flex flex-col">
                  <label>
                    <input
                      type="radio"
                      value="-1"
                      checked={score1 === "-1"}
                      onChange={handleScore1Change}
                    />
                    <span>
                      <b>-1</b>
                      <i>
                        {" "}
                        ( No - most or all of the information provided by the
                        model was inaccurate.)
                      </i>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="0"
                      checked={score1 === "0"}
                      onChange={handleScore1Change}
                    />
                    <span>
                      <b>0</b>
                      <i>
                        {" "}
                        ( There was no information provided by the model to
                        assess accuracy.)
                      </i>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="0.5"
                      checked={score1 === "0.5"}
                      onChange={handleScore1Change}
                    />
                    <span>
                      <b>0.5</b>
                      <i> (Some of the information was inaccurate.)</i>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="1"
                      checked={score1 === "1"}
                      onChange={handleScore1Change}
                    />
                    <span>
                      <b>1</b>
                      <i>
                        {" "}
                        (Based on the coder's best judgement, all of the
                        information was accurate.)
                      </i>
                    </span>
                  </label>
                </div>

                <textarea
                  className="mt-2 p-2 border rounded"
                  placeholder="Add your comments here"
                  value={comments1}
                  onChange={handleComments1Change}
                ></textarea>
              </form>
            </div>

            <div className="justify-center space-y-2 p-3">
              <div className="space-x-3 text-md">
                <h2 className="bg-gray-200 p-2 w-fit rounded-md mb-1">
                  <b>2 )</b> Did the model provide accurate cancer screening
                  information?
                </h2>
              </div>
              <form className="flex bg-stone-200 flex-col border border-dashed border-gray-600 rounded p-3 flex-grow">
                <div className="flex flex-col">
                  <label>
                    <input
                      type="radio"
                      value="-1"
                      checked={score2 === "-1"}
                      onChange={handleScore2Change}
                    />
                    <span>
                      <b>-1</b>
                      <i> (No - the model provided inaccurate information.)</i>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="0"
                      checked={score2 === "0"}
                      onChange={handleScore2Change}
                    />
                    <span>
                      <b>0</b>
                      <i>
                        {" "}
                        (The model did not recommend cancer screening specific
                        to the user's profile.)
                      </i>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="0.5"
                      checked={score2 === "0.5"}
                      onChange={handleScore2Change}
                    />
                    <span>
                      <b>0.5</b>
                      <i>
                        {" "}
                        (Partly - the model provided some accurate screening
                        information and some inaccurate OR THE MODEL PROVIDED
                        NON-SPECIFIC CANCER SCREENING RECOMMENDATION.)
                      </i>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="1"
                      checked={score2 === "1"}
                      onChange={handleScore2Change}
                    />
                    <span>
                      <b>1</b>
                      <i>
                        {" "}
                        (Yes - the model provided only accurate information
                        about cancer screening guidelines.)
                      </i>
                    </span>
                  </label>
                </div>

                <textarea
                  className="mt-2 p-2 border rounded"
                  placeholder="Add your comments here"
                  value={comments2}
                  onChange={handleComments2Change}
                ></textarea>
              </form>
            </div>

            <div className="justify-center space-y-2 p-3">
              <div className="space-x-3 text-md">
                <h2 className="bg-gray-200 p-2 w-fit rounded-md mb-1">
                  <b>3 )</b> Did the model completely respond to the client's questions?
                </h2>
              </div>
              <form className="flex bg-stone-200 flex-col border border-dashed border-gray-600 rounded p-3 flex-grow">
                <div className="flex flex-col">
                  <label>
                    <input
                      type="radio"
                      value="-1"
                      checked={score3 === "-1"}
                      onChange={handleScore3Change}
                    />
                    <span>
                      <b>-1</b>
                      <i>
                        {" "}
                        (No, the model asked no questions or only questions
                        irrelevant to cancer screening including barriers and
                        opportunities.)
                      </i>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="0"
                      checked={score3 === "0"}
                      onChange={handleScore3Change}
                    />
                    <span>
                      <b>0</b>
                      <i> (Unclear or unable to determine.)</i>
                    </span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="0.5"
                      checked={score3 === "0.5"}
                      onChange={handleScore3Change}
                    />
                    <span>
                      <b>0.5</b>
                      <i>
                        {" "}
                        (Partly - the model provided some accurate screening information and some inaccurate OR THE MODEL PROVIDED NON-SPECIFIC CANCER SCREENING RECOMMENDATION.)
                      </i>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="1"
                      checked={score3 === "1"}
                      onChange={handleScore3Change}
                    />
                    <span>
                      <b>1</b>
                      <i>
                        {" "}
                        (Yes - the model asked at least one question to the user
                        to get more information that would help with cancer
                        screening recommendations.)
                      </i>
                    </span>
                  </label>
                </div>

                <textarea
                  className="mt-2 p-2 border rounded"
                  placeholder="Add your comments here"
                  value={comments3}
                  onChange={handleComments3Change}
                ></textarea>
              </form>
            </div>

            <div className="justify-center space-y-2 p-3">
              <div className="space-x-3 text-md">
                <h2 className="bg-gray-200 p-2 w-fit rounded-md mb-1">
                  <b>4 )</b> Does the model acknowledge the emotion of the
                  client?[emotion]
                </h2>
              </div>
              <form className="flex bg-stone-200 flex-col border border-dashed border-gray-600 rounded p-3 flex-grow">
                <div className="flex flex-col">
                  <label>
                    <input
                      type="radio"
                      value="-1"
                      checked={score4 === "-1"}
                      onChange={handleScore4Change}
                    />
                    <span>
                      <b>-1</b>
                      <i> (No)</i>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="0"
                      checked={score4 === "0"}
                      onChange={handleScore4Change}
                    />
                    <span>
                      <b>0</b>
                      <i> (Not able to assess)</i>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="0.5"
                      checked={score4 === "0.5"}
                      onChange={handleScore4Change}
                    />
                    <span>
                      <b>0.5</b>
                      <i> (Partially - the model did address the emotions of the client but not comprehensively.)</i>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="1"
                      checked={score4 === "1"}
                      onChange={handleScore4Change}
                    />
                    <span>
                      <b>1</b>
                      <i> (Yes)</i>
                    </span>
                  </label>
                </div>

                <textarea
                  className="mt-2 p-2 border rounded"
                  placeholder="Add your comments here"
                  value={comments4}
                  onChange={handleComments4Change}
                ></textarea>
              </form>
            </div>

            <div className="justify-center space-y-2 p-3">
              <div className="space-x-3 text-md">
                <h2 className="bg-gray-200 p-2 w-fit rounded-md mb-1">
                  <b>5 )</b> Does the model track with the conversation, i.e.,
                  follows the turns with the client and responds
                  appropriately?[engagement]
                </h2>
              </div>
              <form className="flex bg-stone-200 flex-col border border-dashed border-gray-600 rounded p-3 flex-grow">
                <div className="flex flex-col">
                  <label>
                    <input
                      type="radio"
                      value="-1"
                      checked={score5 === "-1"}
                      onChange={handleScore5Change}
                    />
                    <span>
                      <b>-1</b>
                      <i> (No)</i>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="0"
                      checked={score5 === "0"}
                      onChange={handleScore5Change}
                    />
                    <span>
                      <b>0</b>
                      <i> (Not able to assess)</i>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="0.5"
                      checked={score5 === "0.5"}
                      onChange={handleScore5Change}
                    />
                    <span>
                      <b>0.5</b>
                      <i> (Partly)</i>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="1"
                      checked={score5 === "1"}
                      onChange={handleScore5Change}
                    />
                    <span>
                      <b>1</b>
                      <i> (Yes)</i>
                    </span>
                  </label>
                </div>

                <textarea
                  className="mt-2 p-2 border rounded"
                  placeholder="Add your comments here"
                  value={comments5}
                  onChange={handleComments5Change}
                ></textarea>
              </form>
            </div>

            <div className="justify-center space-y-2 p-3">
              <div className="space-x-3 text-md">
                <h2 className="bg-gray-200 p-2 w-fit rounded-md mb-1">
                  <b>6 )</b> Does the model show concern for the client?
                </h2>
              </div>
              <form className="flex bg-stone-200 flex-col border border-dashed border-gray-600 rounded p-3 flex-grow">
                <div className="flex flex-col">
                  <label>
                    <input
                      type="radio"
                      value="-1"
                      checked={score6 === "-1"}
                      onChange={handleScore6Change}
                    />
                    <span>
                      <b>-1</b>
                      <i>
                        {" "}
                        (No - the model makes argumentative or defensive
                        statements, uses jabs or sarcasm, or doesn't establish
                        rapport.)
                      </i>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="0"
                      checked={score6 === "0"}
                      onChange={handleScore6Change}
                    />
                    <span>
                      <b>0</b>
                      <i> (Unable to assess.)</i>
                    </span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="0.5"
                      checked={score4 === "0.5"}
                      onChange={handleScore4Change}
                    />
                    <span>
                      <b>0.5</b>
                      <i> (Partially - the model showed some concern for the client.)</i>
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="1"
                      checked={score6 === "1"}
                      onChange={handleScore6Change}
                    />
                    <span>
                      <b>1</b>
                      <i> (Yes - the model shows concern for the client.)</i>
                    </span>
                  </label>
                </div>

                <textarea
                  className="mt-2 p-2 border rounded"
                  placeholder="Add your comments here"
                  value={comments6}
                  onChange={handleComments6Change}
                ></textarea>
              </form>
            </div>
          </div>

          <div className="fixed bottom-0 border-gray-500 border-dashed w-full bg-white flex-col items-center">
            <div className="flex flex-col items-center">
              {!isVisible && (
                <div
                  className="bg-gray-100 border text-center border-gray-400 text-gray-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">
                    Clicking Next/Back will submit the answer. You can navigate
                    to other questions from sidebar.
                  </strong>
                </div>
              )}
            </div>
            <div className=" text-center space-x-8 p-2">
              <button
                className=" bg-red-700 text-white font-bold py-2 px-4 rounded hover:disabled:cursor-not-allowed"
                onClick={handleBackClick}
                // disabled={currentTopicIndex === 0}
              >
                Back
              </button>
              {/* <button
                className=" bg-blue-600  text-white font-bold py-2 px-4 rounded hover:disabled:cursor-not-allowed"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button> */}
              <button
                className=" bg-green-600 text-white font-bold py-2 px-4 rounded hover:disabled:cursor-not-allowed"
                onClick={handleNextClick}
                // disabled={currentTopicIndex === topics.length - 1}
              >
                Next
              </button>
            </div>

            <div
              className={`fixed right-10 z-10 bg-green-100 border max-w-lg text-center border-green-400 text-green-700 px-4 py-3 rounded shadow-lg transition-all duration-500 ${
                showAlert ? "-translate-y-[120%]" : "translate-y-full "
              }`}
              role="alert"
            >
              <strong className="font-bold">Submitted!</strong>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed flex bg-gray-800 justify-center items-center right-0 top-0 z-30 h-full w-96 py-2 pr-2 transition-all duration-300 ${
          isrightOpen ? "translate-x-0" : "translate-x-[22.5rem]"
        }`}
        aria-label="Sidebar"
      >
        <button className=" text-white rounded-md">
          {isrightOpen ? (
            <Closeright onClick={() => setIsRightOpen(false)} />
          ) : (
            <Openright onClick={() => setIsRightOpen(true)} />
          )}
        </button>

        <div className="h-full flex-grow overflow-y-auto p-3 space-y-2 bg-gray-700 rounded-3xl flex flex-col">
          <div className="bg-gray-600 p-4 rounded-xl text-center">
            <h3 className="text-white">Total data points: {topics.length}</h3>
          </div>
          <div className="bg-gray-500 rounded-lg h-fit w-fit flex flex-wrap justify-center text-white items-center p-2">
            {topics.map((item, index) => (
              <div
                key={item._id}
                className={`px-1 border border-black ${
                  index === currentTopicIndex
                    ? "bg-yellow-500"
                    : `${
                        item.edited == "yes" ? "bg-green-500" : "bg-pink-500 "
                      }`
                } h-fit w-fit rounded-sm cursor-pointer m-1`}
                onClick={() => handleClick(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
