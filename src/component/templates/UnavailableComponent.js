export default function UnavailableComponent() {
    return (
        <div style={{
            textAlign: "center",
            minHeight: "100%",
            fontSize: "8vh"
        }}>
            <div style={{marginTop: "37vh"}}>
                An error occured
                <br />
                <div style={{fontSize: "4vh", textAlign: "center"}}>
                    Please contact your local administrator
                </div>
            </div>
        </div>
    )
}