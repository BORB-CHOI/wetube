import axios from "axios";

const commentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const removeCommentBtn = document.querySelectorAll("#jsRemoveComment");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};
const reductionNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const addComment = (comment, commentNo) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btn = document.createElement("button");
  span.innerHTML = comment;
  btn.innerHTML = "❌";
  btn.id = "jsRemoveComment";
  li.id = commentNo;
  li.appendChild(btn);
  li.appendChild(span);
  commentList.prepend(li);
  const removeBtn = document.querySelectorAll("#jsRemoveComment");
  removeBtn.forEach((event) => {
    // eslint-disable-next-line no-use-before-define
    event.addEventListener("click", sendRemoveComment);
  });
  increaseNumber();
};

const removeComment = (e) => {
  const li = e.target.parentNode;
  commentList.removeChild(li);
  reductionNumber();
};

const sendAddComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  let commentNum;
  if (commentList.firstChild) {
    commentNum = Number(commentList.firstChild.id.split("&")[1]);
  } else {
    commentNum = 0;
  }
  commentNum += 1;
  const commentNo = `${videoId}&${commentNum}`;
  const response = await axios({
    url: `/api/${videoId}/add-comment`,
    method: "POST",
    data: {
      comment,
      commentNo,
      // comment : comment
    },
  });
  if (response.status === 200) {
    addComment(comment, commentNo);
  }
};

const sendRemoveComment = async (e) => {
  const videoId = window.location.href.split("/videos/")[1];
  const commentNum = Number(e.target.parentNode.id.split("&")[1]);
  const commentNo = `${videoId}&${commentNum}`;
  const response = await axios({
    url: `/api/${videoId}/remove-comment`,
    method: "POST",
    data: { commentNo },
  });
  if (response.status === 200) {
    removeComment(e);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = commentForm.querySelector("input");
  const comment = commentInput.value;
  sendAddComment(comment);
  commentInput.value = "";
};

function init() {
  commentForm.addEventListener("submit", handleSubmit);
  removeCommentBtn.forEach((event) => {
    event.addEventListener("click", sendRemoveComment);
  });
}

if (commentForm) {
  init();
}
