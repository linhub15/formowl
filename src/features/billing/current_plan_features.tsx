import { Card, CardBody, CardHeader } from "@/components/layout/card";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Badge } from "@/components/ui/badge";

type Props = {
  planLabel: string;
  features: string[];
};

export function CurrentPlanFeatures(props: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <span className="capitalize">{props.planLabel}</span>
        &nbsp;
        <Badge>Current plan</Badge>
      </CardHeader>
      <CardBody>
        <div className="space-y-6">
          <ul className="space-y-3.5 text-sm/6">
            {props.features.map((feature) => (
              <li className="flex gap-x-3" key={feature}>
                <CheckCircleIcon
                  aria-hidden="true"
                  className="h-6 w-5 flex-none text-emerald-600"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  );
}
