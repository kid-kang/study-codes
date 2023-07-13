import "./index.less";

interface BannerProps {
  title: string;
}

export default function Banner(props: BannerProps) {
  return (
    <div className="banner__wrap--component">
      <p className="title">{props.title}</p>
      <div className="placeholder"></div>
      <p className="text">对前端保持好奇心、目的和激情，始终如一</p>
    </div>
  );
}
