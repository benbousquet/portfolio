import { Socket, io } from "socket.io-client";
import { Github, Linkedin, Mail } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";

function App() {
  const [s, setS] = useState<Socket>(io("ws://127.0.0.1:3000", {}));

  useEffect(() => {
    return () => {
      s.disconnect();
    };
  }, []);

  function handleMouseMove(e: MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    s.emit("move", { x, y });
    console.log("emitted")
  }

  return (
    <div
      className="lg:max-w-7xl max-w-fit lg:mx-auto"
      onMouseMove={handleMouseMove}
    >
      <div className="border-neutral border-2 w-fit rounded-2xl p-6  mt-16 space-y-2">
        <div className="[&>h1]:lg:text-3xl [&>h1]:text-2xl">
          <h1>Hi 👋</h1>
          <h1>My name is Ben Bousquet</h1>
        </div>
        <div>
          <h2>I have both a Bachelors and Masters degree from ASU,</h2>
          <h2>with a focus in Data Science and Distributed Computing.</h2>
        </div>
        <div>
          <h2>
            I'm in full-stack web development and enjoy learning new things,
          </h2>
          <h2>
            when im not coding, im learning japanese or listening to music.
          </h2>
        </div>
        <div>
          <div className="join lg:join-horizontal">
            <a
              className="btn join-item"
              href="https://github.com/benbousquet"
              target="_blank"
            >
              <Github />
            </a>
            <a
              className="btn join-item"
              href="https://www.linkedin.com/in/ben-bousquet/"
              target="_blank"
            >
              <Linkedin />
            </a>
            <div className="tooltip tooltip-bottom" data-tip="bbousque@asu.edu">
              <a className="btn join-item" href="mailto:bbousque@asu.edu">
                <Mail />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
