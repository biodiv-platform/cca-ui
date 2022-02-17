import cogoToast from "cogo-toast";

export enum NotificationType {
  Success = "success",
  Info = "info",
  Warning = "warn",
  Error = "error"
}

const notification = (message, type = NotificationType.Error) => {
  if (!message) {
    return;
  }

  if (process.browser) {
    const toaster = cogoToast[type];
    const { hide }: any = toaster(message, {
      position: "top-center",
      hideAfter: 10,
      onClick: () => {
        hide();
      }
    });
  }
};

export default notification;
