function Download({ progress, ...rest }) {
  const defaultDownload = {
    title: "",
    selected: false,
    progress: {
      _total_bytes_str: "0Mib",
      _percent_str: "100%",
      _speed_str: "-",
      _elapsed_str: "00:00",
      status: ""
    }
  };

  Object.assign(this, {
    ...defaultDownload,
    ...rest,
    progress: { ...defaultDownload.progress, ...progress }
  });
}

export default Download;
