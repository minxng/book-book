export default function Footer() {
  return (
    <footer className=" bg-primary py-10 mt-20 static bottom-0 text-sm text-white font-light">
      <div className="mx-auto max-w-[1200px] text-center flex flex-col gap-4">
        <p>알라딘 API를 이용하여 도서 정보를 제공합니다.</p>
        <p>
          이 프로젝트는 개인 프로젝트용으로 제작되었으며&nbsp;
          <br className="sm:hidden" />
          상업적 목적이 없습니다.
        </p>
        <p>&copy; 2025. All rights reserved.</p>
      </div>
    </footer>
  );
}
