import express from "express"; // server frame work | frame work = 미리 작업된 코드들 (어썸하게 편함)
import morgan from "morgan"; // middleWare info catch ==> application all work logging |loggin = 기록 = recording
import helmet from "helmet"; // security을 위한 아직은 뭔지 모르는 것
import bodyParser from "body-parser"; //사진이나 비디오를 업로드 할 때, 제목이나 댓글같은 정보를 전달할때 form에 담음
//사용자가 보내는 requsest 정보에서 form이나 json 형태로 된 body를 검사해주는 middleWare
import cookieParser from "cookie-parser"; // 쿠키를 전달받아 해석 가능하게 해주는 middleWare
import { localMiddleware } from "./middleware";
import routes from "./routes"; // URL들이 정의된 파일 가져옴
import userRouter from "./routers/userRouter"; // 경로지정자 파일 가져옴
import videoRouter from "./routers/videoRouter"; // 경로지정자 파일 가져옴
import globalRouter from "./routers/globalRouter"; // 경로지정자 파일 가져옴

const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localMiddleware); //.pug 즉 템플릿에서 쓸 수 있는 locals 전역 변수 설정. 코드 사이에 있기에
//  다음 함수로 넘어간다는 뜻인 next();를 호출해야 함.

app.use(routes.home, globalRouter); // /:URL
app.use(routes.users, userRouter); // /user/:URL
app.use(routes.videos, videoRouter); // /video/:URL

export default app;
