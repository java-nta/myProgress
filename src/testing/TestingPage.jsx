import "./assets/Testing.css";

// Skeleton card.
const TestingPage = () => {
  return (
    <>
      <div
        className="
          d-flex 
          flex-wrap
          justify-content-center
          align-items-center
          gap-3 m-5
        "
      >
        <div className="character-card card-skel ">
          <div className="img-skel skeleton"></div>
          <div className="header-skel skeleton"></div>
          <div className="p-skel skeleton"></div>
        </div>
        <div className="character-card">
          <img src="img.jpg" alt="character_image" />
          <h3>Selify Senpai</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            sit nisi, assumenda maiores ducimus delectus animi distinctio
            dolorum ipsum rerum molestiae nam. Autem quidem excepturi doloremque
            commodi cupiditate, omnis numquam.
          </p>
        </div>
      </div>
    </>
  );
};

export default TestingPage;
