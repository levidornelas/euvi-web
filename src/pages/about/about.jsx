import { FaLinkedin, FaInstagram } from "react-icons/fa";
import BottomNavbar from "../../components/navBar";

export default function AboutUs() {
  return (
    <>
      {/* Seção de introdução */}
      <div className="flex flex-col items-center justify-center mt-28 sm:mt-20 px-8">
        <h1 className="text-4xl font-bold text-white">Sobre Nós</h1>
      </div>

      {/* Valores e objetivos */}
      <div className="flex flex-col items-center gap-6 mt-16 px-6">
        <div className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-2">Quem somos</h2>
          <p>
            Somos uma startup formada por recifenses apaixonados pela cultura
            local. Nosso time é movido pela vontade de destacar a riqueza
            cultural de Recife e transformá-la em uma experiência acessível e
            envolvente para todos. Acreditamos que a tecnologia pode ser uma
            ferramenta poderosa para revelar os tesouros da cidade e conectar
            pessoas à sua essência cultural.
          </p>
        </div>

        <div className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-2">Nossa Missão</h2>
          <p>
            Conectar cidadãos e turistas à rica herança cultural de Recife,
            utilizando a tecnologia como ponte para valorizar a história, a
            música e o cinema presentes em cada canto da cidade. Nossa missão é
            promover o turismo local e oferecer novas perspectivas sobre Recife,
            celebrando tudo o que torna a cidade única e inspiradora.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-black">Contatos</h2>
          <div className="">
            <a
              href="https://www.instagram.com/euvi.tech/"
              aria-label="Instagram"
              target="blank"
            >
              <FaInstagram className="text-3xl text-black" />
            </a>
            <a
              href="https://www.linkedin.com/company/eu-vi/"
              aria-label="LinkedIn"
              target="blank"
            >
              <FaLinkedin className="text-3xl text-[#0077B5] mt-3" />
            </a>
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
}
