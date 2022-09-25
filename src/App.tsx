import { Logo } from "./components/icons/logo";
import { useEffect, useState } from "react";
import { client } from "./components/lib/axios";
import { Modal } from "./components/Modal";

function App() {
  const [showModal, setModal] = useState<boolean>(false);

  useEffect(() => {
    client.get("/diary").then((res) => console.log(res));
  }, []);

  return (
    <div className="App">
      <Logo width={70} height={70} />
      <button onClick={() => setModal(true)}>모달 오픈</button>
      {showModal && <Modal setModal={setModal} />}
    </div>
  );
}

export default App;
