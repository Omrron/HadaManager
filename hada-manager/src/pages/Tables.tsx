import { Table } from "../components/Table";

export function Tables() {
    return (
        <div className="flex-container">
           <Table name="חד&quot;א קצינים" current={2} capacity={5}/>
           <Table name="חד&quot;א קצינים" current={2} capacity={5}/>
           <Table name="חד&quot;א קצינים" current={2} capacity={5}/>
           <Table name="חד&quot;א קצינים" current={2} capacity={5}/>
           <Table name="חד&quot;א קצינים" current={2} capacity={5}/>
        </div>
    )
}