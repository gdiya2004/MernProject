import { useAuth } from "../store/auth";

export const Service = () => {
    const { services } = useAuth();
    if (!Array.isArray(services)) {
        return <p>Loading services...</p>;
    }

    return (
        <section className="section-services">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>
            <div className="container grid grid-three-cols">
                {services.map((currElem, index) => (
                    <div className="card" key={index}>
                        <div className="card-img">
                            <img src="/images/design.png" alt="services" width="200" />
                        </div>
                        <div className="card-details">
                            <div className="grid grid-two-cols">
                                <p>{currElem.provider}</p>
                                <p>{currElem.price}</p>
                            </div>
                            <h2>{currElem.service}</h2>
                            <p>{currElem.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
