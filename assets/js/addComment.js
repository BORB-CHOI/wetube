import axios from "axios";

const commentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
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
  increaseNumber();
};

const sendComment = async (comment) => {
  let commentId;
  if (commentList.firstChild) {
    commentId = Number(commentList.firstChild.id);
  } else {
    commentId = 0;
  }
  const commentNo = commentId + 1;
  const videoId = window.location.href.split("/videos/")[1];
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

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = commentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  commentForm.addEventListener("submit", handleSubmit);
}

if (commentForm) {
  init();
}
