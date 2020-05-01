import axios from "axios";

const commentForm = document.getElementById("jsAddComment");
const removeCommentBtn = document.getElementById("jsRemoveComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const removeComment = (e) => {
  const li = e.target.parentNode;
  commentList.removeChild(li);
  increaseNumber();
};

const sendRemoveComment = async (e) => {
  const commentNo = Number(commentList.firstChild.id);
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/remove-comment`,
    method: "POST",
    data: { commentNo },
  });
  if (response.status === 200) {
    removeComment(e);
  }
};

function init() {
  commentList.addEventListener("click", sendRemoveComment);
}

if (commentForm) {
  init();
}
