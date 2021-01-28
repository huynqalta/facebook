import { Button, Card } from "antd";
import React from "react";

interface IProps {
  data: Array<any>;
  action: Array<any>;
  handleClick: (data) => void;
}

const index = ({ data, action }: IProps) => {
  return (
    <>
      {data.map((item) => {
        return (
          <Card>
            <div className="d-flex">
              <p>{item}</p>
              <div className="action">
                {action.map((itemAction) => {
                  return (
                    <Button onClick={() => itemAction.handleClick(item)}>
                      {itemAction.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default index;
