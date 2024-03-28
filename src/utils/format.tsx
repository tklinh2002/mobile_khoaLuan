export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}-${month}-${year}`;
};

/// dùng để xem bài đăng đã đăng bao lâu
export const formatTimePost = (dateString) => {
  const now = new Date();

  const specificDate = new Date(dateString);

  const timeDifference = specificDate.getTime() - now.getTime();

  const seconds = Math.abs(Math.floor(timeDifference / 1000));
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if(days > 0) {
    return `Đăng ${days} ngày trước`;
  }else if(hours > 0){
    return `Đăng ${hours} giờ trước`;
  }else{
    return `Đăng ${minutes} phút trước`;
  }
};
