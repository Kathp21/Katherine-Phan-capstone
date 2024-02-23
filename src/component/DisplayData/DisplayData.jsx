function DisplayData({ inputData }) {
    if (!inputData) return <div>Loading...</div>
    console.log(inputData)
    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: inputData.replace(/\n/g,"<br>")}}/>
        </div>
    );
}

export default DisplayData;
