export default function Button({children,onClick}){
    return (
        <button className="bg-blue-500
           hover:bg-blue-700
            text-white font-bold py-1 px-4 rounded
            my-3"
            onClick={onClick}
            >
            {children}
          </button>
    )
}