const Container = ({ children, ...props }) => {
  return (
    <section className="my-0 mx-auto p-5 max-w-screen-xl min-h-[100vh-100px]" {...props}>
      {children}
    </section>
  )
}

export default Container
