import { Overview } from "./sub-components/overview";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
const Dashboard = () => {
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight ">
            Dashboard
          </h2>
          <div className="flex items-center space-x-2">
           
            <button>Download</button>
          </div>
        </div>
        <div defaultValue="overview" className="space-y-4">
         
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className=" border-2  rounded-md cursor-pointer hover:shadow-2xl transition-all">
                <CardContent>
                
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <span className="text-sm font-medium">Total Revenue</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">$45,231.89</h1>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className=" border-2  rounded-md cursor-pointer hover:shadow-2xl transition-all">
                <CardContent>
                  
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="text-sm font-medium">Sales</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className=" border-2  rounded-md cursor-pointer hover:shadow-2xl transition-all">
                <CardContent>
                 
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h1 className="text-sm font-medium">Active Now</h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <h1>
                  <p>Overview</p>
                </h1>
                <div className="">
                  <Overview />
                </div>
              </div>
              <div className="col-span-3">
                <span>
                  <h2>Recent Sales</h2>
                  <p>You made 265 sales this month.</p>
                </span>
                <div>{/* //  <RecentSales /> */}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
